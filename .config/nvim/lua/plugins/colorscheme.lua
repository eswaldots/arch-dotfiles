return {
  {
    "neanias/everforest-nvim",
    config = function()
      require("everforest").setup({
        transparent_background_level = 2,
        diagnostic_virtual_text = "coloured",
        disable_terminal_colours = true,
        background = "soft",
        ui_contrast = "low",
      })
    end,
  },

  opts = {},

  { -- plugin spec for LazyVim
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "everforest",
    },
  },
}
