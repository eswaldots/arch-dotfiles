return {
  "stevearc/oil.nvim",
  config = function()
    require("oil").setup({
      -- disable default oil keybindings
    })
  end,
  opts = {
    view_options = {
      show_hidden = true -- Display hidden files (dotfiles)
    },
  }
}
