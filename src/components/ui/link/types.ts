import type {AllowedComponentProps, ComponentCustomProps, VNodeProps} from "vue";
import type {RouterLinkProps} from "vue-router";

export type LinkProps = AllowedComponentProps & ComponentCustomProps & VNodeProps & RouterLinkProps;