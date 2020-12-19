import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { createRepositoryProxy } from './repoProxy'

@ObjectType()
@InputType()
export abstract class Tenant_Creatable {
  constructor(data?: Tenant_Creatable) {
    Object.assign(this, data)
  }

  @Column()
  @Field()
  public name: string

  @Column()
  @Field()
  @Index({ unique: true })
  public handle: string
}

@InputType()
@ObjectType()
@Entity()
export class Tenant extends Tenant_Creatable {
  constructor(data?: Tenant_Creatable & Omit<Partial<Tenant>, keyof Tenant_Creatable>) {
    super(data)
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string
}

export const tenants = createRepositoryProxy(Tenant)
