import { Component, h } from '@stencil/core';

@Component({
    tag: 'apollo-toolbar-actions',
    styleUrl: 'actions.scss',
})
export class Actions {
    render() {
        return (
            <apollo-stack spacing="half" alignItems="center">
                <apollo-flex>
                    <slot />
                </apollo-flex>
                <apollo-box>
                    <apollo-box
                        class="profile"
                        borderRadius="pill"
                        border="light"
                        borderColor="grayscale.100"
                        // width="84px"
                        marginLeft="3"
                    >
                        <apollo-ripple>
                            <apollo-flex spacer alignItems="center">
                                {/* <apollo-flex grow={1} justify="center">
                                    <apollo-icon svgIcon="arrows-angle-down-b"></apollo-icon>
                                </apollo-flex> */}
                                <apollo-avatar size="small" border="light" radius="full" src="" alt="alt text" />
                            </apollo-flex>
                        </apollo-ripple>
                    </apollo-box>
                </apollo-box>
            </apollo-stack>
        );
    }
}
