import { Accordion, Link, Text, Button } from "../../../atomic";
import { DrawerContent } from "../utils";
import { MenuHeaderProps } from "./MenuHeader.types";

export const MenuHeader = (props: MenuHeaderProps) => {
    const { navigation } = props;
    return (

        <DrawerContent direction="column" gap={6}>
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