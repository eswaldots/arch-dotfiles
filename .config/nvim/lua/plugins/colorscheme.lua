return {
  {
    "neanias/everforest-nvim",
    config = function()
      require("everforest").setup({
        transparent_background_level = 2,
        diagnostic_virtual_text = "coloured",
        background = "soft",
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
