import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { createRepositoryProxy } from './repoProxy'
import { Tenant } from './Tenant'

@ObjectType()
@InputType()
export abstract class Application_Creatable {
  constructor(data?: Application_Creatable) {
    Object.assign(this, data)
  }

  @Column()
  @Field()
  public name: string
}

@InputType()
@ObjectType()
@Entity()
export class Application extends Application_Creatable {
  constructor(data?: Application_Creatable & Omit<Partial<Application>, keyof Application_Creatable>) {
    super(data)
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string

  @Column({ name: 'tenant', type: 'uuid' })
  public tenantId: string

  @ManyToOne(() => Tenant, (other) => other.applications)
  public tenant: Tenant

  @Column({ nullable: true })
  @Field({ nullable: true })
  public openIDLoginURL?: string
}

export const applications = createRepositoryProxy(Application)
