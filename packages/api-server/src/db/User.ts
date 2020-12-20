import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MasterSession } from './MasterSession'
import { createRepositoryProxy } from './repoProxy'

@InputType()
@ObjectType()
@Entity()
export class User {
  constructor(data?: Partial<User>) {
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string

  @OneToMany(() => MasterSession, (other) => other.user)
  public masterSessions: Promise<MasterSession[]>

  @Column('json')
  public customFields: { [key: string]: string }
}

export const masterSessions = createRepositoryProxy(MasterSession)
