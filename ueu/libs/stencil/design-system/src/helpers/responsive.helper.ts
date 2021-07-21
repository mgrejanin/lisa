type MediaQueries = 'base' | 'xs' | 'sm' | 'md' | 'lg';
export type ResponsiveProp<T> = T | { [k in MediaQueries]?: T };

/**
 * Cria variações responsivas para as classes do Design System
 * @param name Nome que será prefixo das classes a serem criadas
 * @param prop Propriedade responsiva que manipulará as classes
 */
export const createResponsiveClassnames = <T extends ResponsiveProp<string | number>>(name: string, prop: T) => {
    if (!prop) {
        return '';
    }

    const prefixName = `apollo-${name}`;
    if (typeof prop === 'string' || typeof prop === 'number') {
        return `${prefixName}--${prop}`;
    }
    const responsiveClassnames: string[] = [];
    Object.keys(prop).forEach(breakpoint => {
        const responsiveName = `${prefixName}--${prop[breakpoint]}`;
        responsiveClassnames.push(breakpoint === `initial` ? responsiveName : `${breakpoint}:${responsiveName}`);
    });
    return responsiveClassnames;
};
