interface Request{
    // eslint-disable-next-line camelcase
    user_id: string;
    avatarFilename: string;
}

class UpdateUserService {
    public async execute({ user_id, avatarFilename }: Request): Promise<void> {}
}

export default UpdateUserService;
