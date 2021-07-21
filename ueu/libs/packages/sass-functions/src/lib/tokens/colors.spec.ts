import Colors from './colors';

describe('Colors token', () => {
    /** primary palette */
    describe('Primary property', () => {
        it('Should exist', () => {
            expect(Colors.primary).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.primary.light[50]).toBeDefined();
            expect(Colors.primary.dark[50]).toBeDefined();
        });

        it('Should have "200" color depth', () => {
            expect(Colors.primary.light[200]).toBeDefined();
            expect(Colors.primary.dark[200]).toBeDefined();
        });

        it('Should have "500" color depth', () => {
            expect(Colors.primary.light[500]).toBeDefined();
            expect(Colors.primary.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.primary.light[800]).toBeDefined();
            expect(Colors.primary.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.primary.light[800]).toBeDefined();
            expect(Colors.primary.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.primary.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.primary.light['base']).toBeDefined();
            expect(Colors.primary.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.primary.dark).toBeDefined();
        });
    });

    // /** secondary palette */
    describe('secondary property', () => {
        it('Should exist', () => {
            expect(Colors.secondary).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.secondary.light[50]).toBeDefined();
            expect(Colors.secondary.dark[50]).toBeDefined();
        });


        it('Should have "200" color depth', () => {
            expect(Colors.secondary.light[200]).toBeDefined();
            expect(Colors.secondary.dark[200]).toBeDefined();
        });


        it('Should have "500" color depth', () => {
            expect(Colors.secondary.light[500]).toBeDefined();
            expect(Colors.secondary.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.secondary.light[800]).toBeDefined();
            expect(Colors.secondary.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.secondary.light[800]).toBeDefined();
            expect(Colors.secondary.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.secondary.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.secondary.light['base']).toBeDefined();
            expect(Colors.secondary.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.secondary.dark).toBeDefined();
        });
    });

    // /** Warning palette */
    describe('Warning property', () => {
        it('Should exist', () => {
            expect(Colors.warning).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.warning.light[50]).toBeDefined();
            expect(Colors.warning.dark[50]).toBeDefined();
        });

        it('Should have "200" color depth', () => {
            expect(Colors.warning.light[200]).toBeDefined();
            expect(Colors.warning.dark[200]).toBeDefined();
        });

        it('Should have "500" color depth', () => {
            expect(Colors.warning.light[500]).toBeDefined();
            expect(Colors.warning.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.warning.light[800]).toBeDefined();
            expect(Colors.warning.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.warning.light[900]).toBeDefined();
            expect(Colors.warning.dark[900]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.warning.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.warning.light['base']).toBeDefined();
            expect(Colors.warning.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.warning.dark).toBeDefined();
        });
    });

    // /** Critical palette */
    describe('Critical property', () => {
        it('Should exist', () => {
            expect(Colors.critical).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.critical.light[50]).toBeDefined();
            expect(Colors.critical.dark[50]).toBeDefined();
        });

        it('Should have "200" color depth', () => {
            expect(Colors.critical.light[200]).toBeDefined();
            expect(Colors.critical.dark[200]).toBeDefined();
        });

        it('Should have "500" color depth', () => {
            expect(Colors.critical.light[500]).toBeDefined();
            expect(Colors.critical.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.critical.light[800]).toBeDefined();
            expect(Colors.critical.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.critical.light[800]).toBeDefined();
            expect(Colors.critical.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.critical.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.critical.light['base']).toBeDefined();
            expect(Colors.critical.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.critical.dark).toBeDefined();
        });
    });

    // /** Success palette */
    describe('Success property', () => {
        it('Should exist', () => {
            expect(Colors.success).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.success.light[50]).toBeDefined();
            expect(Colors.success.dark[50]).toBeDefined();
        });


        it('Should have "200" color depth', () => {
            expect(Colors.success.light[200]).toBeDefined();
            expect(Colors.success.dark[200]).toBeDefined();
        });


        it('Should have "500" color depth', () => {
            expect(Colors.success.light[500]).toBeDefined();
            expect(Colors.success.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.success.light[800]).toBeDefined();
            expect(Colors.success.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.success.light[800]).toBeDefined();
            expect(Colors.success.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.success.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.success.light['base']).toBeDefined();
            expect(Colors.success.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.success.dark).toBeDefined();
        });
    });

    // /** Neutral palette */
    describe('Neutral property', () => {
        it('Should exist', () => {
            expect(Colors.neutral).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.neutral.light[50]).toBeDefined();
            expect(Colors.neutral.dark[50]).toBeDefined();
        });

        it('Should have "200" color depth', () => {
            expect(Colors.neutral.light[200]).toBeDefined();
            expect(Colors.neutral.dark[200]).toBeDefined();
        });

        it('Should have "500" color depth', () => {
            expect(Colors.neutral.light[500]).toBeDefined();
            expect(Colors.neutral.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.neutral.light[800]).toBeDefined();
            expect(Colors.neutral.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.neutral.light[800]).toBeDefined();
            expect(Colors.neutral.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.neutral.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.neutral.light['base']).toBeDefined();
            expect(Colors.neutral.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.neutral.dark).toBeDefined();
        });
    });

    /** Grayscale palette */
    describe('Grayscale property', () => {
        it('Should exist', () => {
            expect(Colors.grayscale).toBeDefined();
        });

        it('Should have "50" color depth', () => {
            expect(Colors.grayscale.light[50]).toBeDefined();
            expect(Colors.grayscale.dark[50]).toBeDefined();
        });

        it('Should have "200" color depth', () => {
            expect(Colors.grayscale.light[200]).toBeDefined();
            expect(Colors.grayscale.dark[200]).toBeDefined();
        });

        it('Should have "500" color depth', () => {
            expect(Colors.grayscale.light[500]).toBeDefined();
            expect(Colors.grayscale.dark[500]).toBeDefined();
        });

        it('Should have "800" color depth', () => {
            expect(Colors.grayscale.light[800]).toBeDefined();
            expect(Colors.grayscale.dark[800]).toBeDefined();
        });

        it('Should have "900" color depth', () => {
            expect(Colors.grayscale.light[800]).toBeDefined();
            expect(Colors.grayscale.dark[800]).toBeDefined();
        });

        it('Should have "light" color depth', () => {
            expect(Colors.grayscale.light).toBeDefined();
        });

        it('Should have "base" color depth', () => {
            expect(Colors.grayscale.light['base']).toBeDefined();
            expect(Colors.grayscale.dark['base']).toBeDefined();
        });

        it('Should have "dark" color depth', () => {
            expect(Colors.grayscale.dark).toBeDefined();
        });
    });


    // /** Background palette */
    describe('Background property', () => {
        it('should exist', () => {
            expect(Colors.background).toBeDefined();
        });

        /** Light background */
        describe('Light background', () => {
            it('Should exist', () => {
                expect(Colors.background.light).toBeDefined();
            });

            it('Should have primary color', () => {
                expect(Colors.background.light.primary).toBeDefined();
            });

            it('Should have secondary color', () => {
                expect(Colors.background.light.secondary).toBeDefined();
            });

            it('Should have tertiary color', () => {
                expect(Colors.background.light.tertiary).toBeDefined();
            });

            it('Should have on-background color', () => {
                expect(Colors.background.light['on-background']).toBeDefined();
            });
        });

        /** Dark background */
        describe('Dark background', () => {
            it('Should exist', () => {
                expect(Colors.background.dark).toBeDefined();
            });

            it('Should have primary color', () => {
                expect(Colors.background.dark.primary).toBeDefined();
            });

            it('Should have secondary color', () => {
                expect(Colors.background.dark.secondary).toBeDefined();
            });

            it('Should have tertiary color', () => {
                expect(Colors.background.dark.tertiary).toBeDefined();
            });

            it('Should have on-background color', () => {
                expect(Colors.background.dark['on-background']).toBeDefined();
            });
        });

        /** Base color */
        it('Should have base color', () => {
            expect(Colors.background.base).toBeDefined();
        });

        /** Secondary color */
        it('Should have secondary color', () => {
            expect(Colors.background.secondary).toBeDefined();
        });

        /** Tertiary color */
        it('Should have tertiary color', () => {
            expect(Colors.background.tertiary).toBeDefined();
        });
    });

    it('Should have white color', () => {
        expect(Colors.white).toBeDefined();
    });

    it('Should have black color', () => {
        expect(Colors.black).toBeDefined();
    });
});
