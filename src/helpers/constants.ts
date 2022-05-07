import {
  faCheck,
  faChevronRight,
  faEnvelope,
  faInfoCircle,
  faSearch,
  faTimesCircle,
  faUnlockAlt,
  faUser,
  faChevronDown,
  faSignOutAlt,
  faUsersCog,
  faUserPlus,
  faUsers,
  faPlus,
  faUserEdit,
  faTimes,
  faPencilAlt,
  faChevronLeft,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import {
  faPaperPlane as farPaperPlane,
  faQuestionCircle as farQuestionCircle,
  faSmile as farSmile,
  faTrashAlt as farTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { EIconTypes } from 'models/icons';
import { EPageComponentTypes } from 'models/route';
import { ErrorPage } from 'pages/ErrorPage';
import { AddGroupsSection } from 'pages/MainPage/AddGroupsSection';
import { GroupsSection } from 'pages/MainPage/GroupsSection';
import { UsersSection } from 'pages/MainPage/UsersSection';
import { AddUsersSection } from 'pages/MainPage/AddUsersSection';
import { MainPage } from 'pages/MainPage';
import { EditUserSection } from 'pages/MainPage/EditUserSection';
import { EditGroupSection } from 'pages/MainPage/EditGroupSection';
import { TokenPage } from 'pages/TokenPage';
import { ProfilePage } from 'pages/ProfilePage';

export const icons = {
  [EIconTypes.email]: faEnvelope,
  [EIconTypes.password]: faUnlockAlt,
  [EIconTypes.rightChevron]: faChevronRight,
  [EIconTypes.leftChevron]: faChevronLeft,
  [EIconTypes.search]: faSearch,
  [EIconTypes.infoCircle]: faInfoCircle,
  [EIconTypes.closeCircle]: faTimesCircle,
  [EIconTypes.check]: faCheck,
  [EIconTypes.paperPlane]: farPaperPlane,
  [EIconTypes.account]: faUser,
  [EIconTypes.downChevron]: faChevronDown,
  [EIconTypes.signOut]: faSignOutAlt,
  [EIconTypes.smile]: farSmile,
  [EIconTypes.usersCog]: faUsersCog,
  [EIconTypes.userPlus]: faUserPlus,
  [EIconTypes.group]: faUsers,
  [EIconTypes.plus]: faPlus,
  [EIconTypes.userEdit]: faUserEdit,
  [EIconTypes.cross]: faTimes,
  [EIconTypes.pencil]: faPencilAlt,
  [EIconTypes.trash]: farTrashAlt,
  [EIconTypes.questionMark]: farQuestionCircle,
  [EIconTypes.userSettings]: faUserCog,
};

export const pageComponentTypes = {
  [EPageComponentTypes.ErrorPage]: ErrorPage,
  [EPageComponentTypes.AddGroupsSection]: AddGroupsSection,
  [EPageComponentTypes.GroupsSection]: GroupsSection,
  [EPageComponentTypes.UsersSection]: UsersSection,
  [EPageComponentTypes.AddUsersSection]: AddUsersSection,
  [EPageComponentTypes.MainPage]: MainPage,
  [EPageComponentTypes.EditUserSection]: EditUserSection,
  [EPageComponentTypes.EditGroupSection]: EditGroupSection,
  [EPageComponentTypes.TokenPage]: TokenPage,
  [EPageComponentTypes.ProfilePage]: ProfilePage,
};
