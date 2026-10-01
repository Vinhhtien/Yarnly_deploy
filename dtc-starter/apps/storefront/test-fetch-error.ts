import { FetchError } from "@medusajs/js-sdk"
console.log(Object.getOwnPropertyNames(new FetchError("", { status: 400, message: "test" } as any)))
