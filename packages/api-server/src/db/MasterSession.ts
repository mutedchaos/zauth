import { Field, InputType, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApplicationSession } from './ApplicationSession'
import { createRepositoryProxy } from './repoProxy'
import { User } from './User'

@InputType()
@ObjectType()
@Entity()
export class MasterSession {
  constructor(data?: Partial<MasterSession>) {
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string

  @OneToMany(() => ApplicationSession, (other) => other.masterSession)
  public applicationSessions: Promise<ApplicationSession[]>

  @ManyToOne(() => User, (other) => other.masterSessions)
  public user: Promise<User>
}

export const masterSessions = createRepositoryProxy(MasterSession)
