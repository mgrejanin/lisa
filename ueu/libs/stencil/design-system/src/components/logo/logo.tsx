import { Component, h, Prop, Host } from '@stencil/core';

@Component({
    tag: 'apollo-logo',
    styleUrl: 'logo.scss',
})
export class Logo {
    /**
     * O nome curto do logo.
     */
    @Prop() nickname: string;

    render() {
        return (
            <Host class="apollo-logo">
                <apollo-stack alignItems="center" spacing="2">
                    {this.nickname ? (
                        <apollo-box
                            width="40px"
                            height="38px"
                            bg="brand"
                            borderTopLeftRadius="light"
                            borderBottomLeftRadius="light"
                            borderRightRadius="full"
                            display="flex"
                            alignItems="center"
                        >
                            <apollo-stack alignItems="center">
                                <apollo-text
                                    class="apollo-logo__nickname"
                                    fontSize="3xl"
                                    fontWeight="black"
                                    color="white"
                                >
                                    {this.nickname}
                                </apollo-text>
                            </apollo-stack>
                        </apollo-box>
                    ) : null}
                    <apollo-text fontWeight="black" fontSize="3xl" color="brand">
                        <slot />
                    </apollo-text>
                </apollo-stack>
            </Host>
        );
    }
}
