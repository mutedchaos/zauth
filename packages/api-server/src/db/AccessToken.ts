import { Field, InputType, ObjectType } from 'type-graphql'
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApplicationSession } from './ApplicationSession'
import { createRepositoryProxy } from './repoProxy'

@InputType()
@ObjectType()
@Entity()
export class AccessToken {
  constructor(data?: Partial<AccessToken>) {
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  public id: string

  @Index({ unique: true })
  @Field()
  @Column()
  public token: string

  @ManyToOne(() => ApplicationSession, (other) => other.accessTokens)
  public applicationSession: Promise<ApplicationSession>
}

export const accessTokens = createRepositoryProxy(AccessToken)
