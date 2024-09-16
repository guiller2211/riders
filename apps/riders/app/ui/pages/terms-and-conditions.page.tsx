import { View, Text, Timeline, TermsConditions, useResponsiveClientValue } from "@riders/ui";


export const TermsConditionsPage = () => {
    return (
        <View
            align="center"
            paddingInline={useResponsiveClientValue({ s: 10, l: 30 })}>
            <TermsConditions />
        </View>
    )
};
