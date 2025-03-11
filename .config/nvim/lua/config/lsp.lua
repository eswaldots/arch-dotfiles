local lspconfig = require("lspconfig")

lspconfig.eslint.setup({
  on_attach = function(client, bufnr)
    -- Enable format on save
    vim.api.nvim_create_autocmd("BufWritePre", {
      buffer = bufnr,
      callback = function()
        if client.name == "eslint" then
          vim.cmd("EslintFixAll")
        end
      end,
    })
  end,
  settings = {
    workingDirectories = {
      mode = "auto",
    },
  },
})
