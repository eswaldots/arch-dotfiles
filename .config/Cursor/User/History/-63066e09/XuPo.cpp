#include <hyprland/src/render/pass/PassElement.hpp>

#define private public
#include <hyprland/src/render/pass/SurfacePassElement.hpp>
#undef private

#include "WindowTransparency.h"

#include <dlfcn.h>

#include <hyprlang.hpp>


inline HANDLE PHANDLE = nullptr;

inline WindowTransparency g_WindowTransparency;
inline std::mutex g_InverterMutex;

inline std::vector<SP<HOOK_CALLBACK_FN>> g_Callbacks;
CFunctionHook* g_surfacePassDraw;

// TODO check out transformers

void hkSurfacePassDraw(CSurfacePassElement* thisptr, const CRegion& damage) {
    {
        std::lock_guard<std::mutex> lock(g_InverterMutex);
        g_WindowTransparency.OnRenderWindowPre(thisptr->data.pWindow);
    }

    ((decltype(&hkSurfacePassDraw))g_surfacePassDraw->m_pOriginal)(thisptr, damage);

    {
        std::lock_guard<std::mutex> lock(g_InverterMutex);
        g_WindowTransparency.OnRenderWindowPost();
    }
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle)
{
    PHANDLE = handle;

    {
        std::lock_guard<std::mutex> lock(g_InverterMutex);
        g_WindowTransparency.Init();
    }

    g_Callbacks = {};
    g_Callbacks.push_back(HyprlandAPI::registerCallbackDynamic(
        PHANDLE, "configReloaded",
        [&](void* self, SCallbackInfo&, std::any data) {
            std::lock_guard<std::mutex> lock(g_InverterMutex);
            g_WindowTransparency.Reload();
        }
    ));
    g_Callbacks.push_back(HyprlandAPI::registerCallbackDynamic(
        PHANDLE, "closeWindow",
        [&](void* self, SCallbackInfo&, std::any data) {
            std::lock_guard<std::mutex> lock(g_InverterMutex);
            g_WindowTransparency.OnWindowClose(std::any_cast<PHLWINDOW>(data));
        }
    ));
    g_Callbacks.push_back(HyprlandAPI::registerCallbackDynamic(
        PHANDLE, "windowUpdateRules",
        [&](void* self, SCallbackInfo&, std::any data) {
            std::lock_guard<std::mutex> lock(g_InverterMutex);
            g_WindowTransparency.ApplyTransparencyIfMatches(std::any_cast<PHLWINDOW>(data));
        }
    ));

    const auto findFunction = [&](const std::string& className, const std::string& name) {
        auto all = HyprlandAPI::findFunctionsByName(PHANDLE, name);
        auto found = std::find_if(all.begin(), all.end(), [&](const SFunctionMatch& line) {
            return line.demangled.starts_with(className + "::" + name);
        });
        if (found != all.end())
            return std::optional(*found);
        else
            return std::optional<SFunctionMatch>();
    };

    static const auto pDraw = findFunction("CSurfacePassElement", "draw");
    if (!pDraw) throw std::runtime_error("Failed to find CSurfacePassElement::draw");
    g_surfacePassDraw = HyprlandAPI::createFunctionHook(handle, pDraw->address, (void*)&hkSurfacePassDraw);
    g_surfacePassDraw->hook();

    HyprlandAPI::addDispatcherV2(PHANDLE, "transparentwindow", [&](std::string args) {
        std::lock_guard<std::mutex> lock(g_InverterMutex);
        g_WindowTransparency.ToggleTransparency(g_pCompositor->getWindowByRegex(args));
        return SDispatchResult{};
    });
    HyprlandAPI::addDispatcherV2(PHANDLE, "transparentactivewindow", [&](std::string args) {
        std::lock_guard<std::mutex> lock(g_InverterMutex);
        g_WindowTransparency.ToggleTransparency(g_pCompositor->m_pLastWindow.lock());
        return SDispatchResult{};
    });

    return {
        "Hypr-TransparentWindow",
        "Allows you to set transparency for specific Windows",
        "micha4w",
        "3.0.1"
    };
}

APICALL EXPORT void PLUGIN_EXIT()
{
    std::lock_guard<std::mutex> lock(g_InverterMutex);
    g_Callbacks = {};
    g_WindowTransparency.Unload();
}

APICALL EXPORT std::string PLUGIN_API_VERSION()
{
    return HYPRLAND_API_VERSION;
}
