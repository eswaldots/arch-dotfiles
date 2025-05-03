-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

local map = LazyVim.safe_keymap_set
local unmap = vim.keymap.del

map("n", "-", ":Oil<cr>")
map("n", "<C-p>", "<cmd>FzfLua files<cr>", { desc = "Search files" })
