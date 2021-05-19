import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { Expose } from 'class-transformer'

@Entity("users")
class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    driver_license: string

    @Column()
    isAdmin: boolean

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @Expose({name: "avatar_url"})
    getAvatarUrl(): string {
        switch(process.env.disk) {
            case "local":
                return ""
            case "s3":
                return ""
            default: 
                return null
        }
    }

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { User }