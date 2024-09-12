import { AppRoutes } from "@riders/types";
import { View, Text, Button } from "../../components";

export const Empty = () => {
    return (
        <View direction="row" gap={9} textAlign='center'>
            <View.Item columns={12}>
                <View gap={2}>
                    <View.Item columns={12}>
                        <Text variant="body-2" weight="medium">
                            Vacio
                        </Text>
                    </View.Item>
                </View>
            </View.Item>

            <View.Item columns={12}>
                <Button size="xlarge" color="primary" href={AppRoutes.Home}>
                    Volver
                </Button>
            </View.Item>
        </View>
    );
};