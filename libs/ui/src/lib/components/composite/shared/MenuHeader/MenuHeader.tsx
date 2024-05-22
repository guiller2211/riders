import { useResponsiveClientValue } from "reshaped";
import { Accordion, Link, Text, Button, View, Divider } from "../../../atomic";
import { DrawerContent } from "../utils";
import { MenuHeaderProps } from "./MenuHeader.types";
import { AppRoutes } from "@ducati/types";

export const MenuHeader = (props: MenuHeaderProps) => {
    const { navigation, user, userMenu } = props;


    return (
        <DrawerContent direction="column" gap={6}>
            {user.isLoggedIn ?
                (<View>
                    <Accordion >
                        <Accordion.Trigger >
                            <Text variant="body-3">{user.name}</Text>
                        </Accordion.Trigger>
                        <Accordion.Content>
                            <View direction="column" align="start">
                                {userMenu?.map((node, i) => {
                                    return (
                                        <Button
                                            variant="ghost"
                                            color="inherit" href={node.button?.props?.href} key={i}>
                                            <Text variant="body-3" weight="medium">
                                                {node.button?.message}
                                            </Text>
                                        </Button>
                                    );
                                })}
                            </View>
                        </Accordion.Content>
                    </Accordion>
                </View>
                )

                :
                (<View direction="row" gap={4}>
                    <Button
                        href='/login'
                        variant="solid"
                        size="large"
                        fullWidth
                    >
                        Ingresar
                    </Button>
                    <Button
                        href='/'
                        variant="outline"
                        size="large"
                        fullWidth
                    >
                        Crear Cuenta
                    </Button>
                </View>
                )
            }

            <Divider />

            {navigation?.map((nav, i) => {
                return nav.nodes && nav.nodes.length > 0 ? (
                    <Accordion key={i}>
                        <Accordion.Trigger >
                            <Text color='warning' variant="featured-3" weight="medium">
                                {nav.button?.message}
                            </Text>
                        </Accordion.Trigger>
                        <Accordion.Content>
                            {nav.nodes?.map((node, i) => {
                                return (
                                    <Link key={i} href={node.button?.props?.href} variant='plain' color='inherit'>
                                        <Text variant="body-3" weight="medium">
                                            {node.button?.message}
                                        </Text>
                                    </Link>
                                );
                            })}
                        </Accordion.Content>
                    </Accordion>
                )
                    : (
                        <Button
                            variant="ghost"
                            color="inherit"
                            href={nav.button?.props?.href}
                            key={i}>
                            <Text color="warning" variant="body-3" weight="medium">
                                {nav.button?.message}
                            </Text>
                        </Button>
                    )
            })}

        </DrawerContent>
    )
}