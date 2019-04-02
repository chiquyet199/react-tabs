import {Linking} from "react-native";

/*
this wrapping nonsense is necessary because jest won't mock
the Linking library in react-native directly on runs of
web tests
*/
export const openURL = url => Linking.openURL(url);
