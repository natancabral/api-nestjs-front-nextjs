import { Migration } from "@mikro-orm/migrations";

export class Migration20250424105854 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" serial primary key, "full_name" varchar(255) not null, "email" varchar(255) not null, "cpf" varchar(11) not null, "birth_date" varchar(10) not null, "phone" varchar(255) not null, "international_phone_code" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "password" varchar(255) not null, "salt" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );
    this.addSql(
      `alter table "users" add constraint "users_cpf_unique" unique ("cpf");`,
    );
  }
}
