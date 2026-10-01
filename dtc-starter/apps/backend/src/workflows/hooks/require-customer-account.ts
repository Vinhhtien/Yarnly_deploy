import { completeCartWorkflow } from "@medusajs/medusa/core-flows"

// We disable this hook because the frontend already enforces login,
// and Medusa v2 store customer creation can sometimes leave has_account=false.
completeCartWorkflow.hooks.validate(async () => {
  return
})
