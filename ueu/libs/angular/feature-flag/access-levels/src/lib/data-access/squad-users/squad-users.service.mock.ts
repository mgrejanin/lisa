export class SquadUsersServiceMock {
    getUsers(squadId: string): void {}

    getRoles(isAdmin: boolean): void {}

    clearStore(): void {}

    removeUserRole(userId: string, role: string): void {}

    addUserRole(consumerId: number, role: string): void {}

    updateUserRole(userId: string, role: string): void {}

    updateFilter(filter: string): void {}
}
