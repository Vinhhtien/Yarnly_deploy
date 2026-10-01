import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
type T = Parameters<typeof completeCartWorkflow.hooks.validate>[0]
