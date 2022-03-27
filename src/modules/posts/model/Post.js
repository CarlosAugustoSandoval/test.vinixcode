export default class Post {
    static create(IPost = null) {
        if (IPost) {
            const {
                id = null,
                title = '',
                body = '',
                created_at = null,
                updated_at = null,
                users_id = null
            } = IPost
            return new this(id, title, body, created_at, updated_at, users_id)
        } else {
            return new this(null, '', '', null, null, null)
        }
    }

    constructor (id, title, body, created_at, updated_at, users_id) {
        this.id = id
        this.title = title
        this.body = body
        this.created_at = created_at
        this.updated_at = updated_at
        this.users_id = users_id
    }
}