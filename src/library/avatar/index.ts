/**
 * Avatar Module Public Exports
 */

// Components
export { AvatarComponent } from './components/avatar.component';
export { AvatarGroupComponent } from './components/avatar-group.component';

// Types
export type { AvatarSize, AvatarShape, AvatarPresence, AvatarSource } from './types/avatar.types';

export { DEFAULT_AVATAR_CONFIG, AVATAR_SIZE_MAP, PRESENCE_SIZE_MAP } from './types/avatar.types';

// Utilities
export { generateInitials, generateColorFromString, getAvatarSource } from './utils/avatar-utils';
