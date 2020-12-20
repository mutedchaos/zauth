import compact from 'lodash/compact'
import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AccessToken } from './AccessToken'
import { MasterSession } from './MasterSession'
import { createRepositoryProxy } from './repoProxy'

@InputType()
@ObjectType()
@Entity()
export class ApplicationSession {
  constructor(data?: Partial<ApplicationSession>) {
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string

  @Column('json')
  public scopes: string[]

  @OneToMany(() => AccessToken, (other) => other.applicationSession)
  public accessTokens: Promise<AccessToken[]>

  @ManyToOne(() => MasterSession, (other) => other.applicationSessions)
  public masterSession: Promise<MasterSession>

  get scopedProfileFields() {
    return compact([
      this.scopes.includes('email') && ('email' as const),
      this.scopes.includes('phone') && ('phone' as const),
      ...(this.scopes.includes('profile') ? ['givenName' as const, 'familyName' as const] : []),
    ])
  }

  get scopedCustomFields() {
    const prefix = 'profile:custom:'
    return this.scopes.filter((s) => s.startsWith(prefix)).map((s) => s.substring(prefix.length))
  }
}

export const applicationSessions = createRepositoryProxy(ApplicationSession)
