import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcryptjs'

import createConnection from '../index'

async function create () {
    
    const connection = await createConnection("localhost")
    const id = uuidV4()
    const password = await hash("1234", 7)

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'xxxx-1213')
        `
    )
    await connection.close
    
}

create().then(() => console.log("User admin created!"))