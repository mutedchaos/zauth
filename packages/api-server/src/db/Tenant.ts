import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Application } from './Application'
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

  @OneToMany(() => Application, (other) => other.tenant)
  public applications: Application[]

  @Column({ nullable: true })
  @Field({ nullable: true })
  public openIDLoginURL?: string
}

export const tenants = createRepositoryProxy(Tenant)
