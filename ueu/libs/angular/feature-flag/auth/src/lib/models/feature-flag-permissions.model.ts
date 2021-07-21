export class FeatureFlagPermissions {
    /**
     * @param availableToAdmin Use true if any global admins can see the content.
     *
     * @param availableToEditor Use true if any global editors can see the content.
     *
     * @param availableToSquadAdmin Enter the id of the squads which their admins.
     *  can see the content.
     *
     * @param availableToSquadEditor Enter the id of the squads which their editors
     *  can see the content.
     *
     * @param isAvailableToSquadAdmin Optional. Use true if any squad admin can access route.
     *  Only used in RoleGuard. Necessary use squadId param on route.
     *
     * @param isAvailableToSquadEditor Optional. Use true if any squad editor can access route.
     *  Only used in RoleGuard. Necessary use squadId param on route.
     *
     */
    constructor(
        public availableToAdmin: boolean = false,
        public availableToEditor: boolean = false,
        public availableToSquadAdmin: string[] = [],
        public availableToSquadEditor: string[] = [],
        public isAvailableToSquadAdmin?: boolean,
        public isAvailableToSquadEditor?: boolean,
    ) {}
}

/**
 * A function to create and FeatureFlagPermissions object using an partial of FeatureFlagPermissions.
 *
 * @param permissions
 *  An object containing a partial of FeatureFlagPermissions.
 *
 * @return
 *  A complete FeatureFlagPermissions object with the default values on the properties
 *  not defined by you.
 *
 * @example
 *  // result
 *  //{
 *  // availableToAdmin: true;
 *  // availableToEditor: false;
 *  // availableToSquadAdmin: [];
 *  // availableToSquadEditor: [];
 *  //}
 *  createFeatureFlagPermissions({availableToAdmin: true});
 */
export function createFeatureFlagPermissions(permissions: Partial<FeatureFlagPermissions>) {
    return { ...new FeatureFlagPermissions(), ...permissions };
}
