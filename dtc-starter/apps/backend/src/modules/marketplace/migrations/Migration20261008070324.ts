import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261008070324 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "sub_order" add column if not exists "shipping_charged" numeric null, add column if not exists "raw_shipping_charged" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "sub_order" drop column if exists "shipping_charged", drop column if exists "raw_shipping_charged";`);
  }

}
