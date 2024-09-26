import type { Meta, StoryObj } from '@storybook/react';

import { CategoryBreadcrumb } from '../index';

const meta: Meta<typeof CategoryBreadcrumb> = {
  title: 'Smith Components/Shared/Category/CategoryBreadcrumb',
  component: CategoryBreadcrumb,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CategoryBreadcrumb>;
export const Primary: Story = {
  args: {
    hiddenHome: false,
    category: {
      id: 'c5952',
      name: 'Circular Saw Blades',
      ancestors: [
        {
          id: 'c19015',
          name: 'Power Saw Blades',
          ancestors: [{ id: 'c11', name: 'Power Tools and Accessories' }],
        },
      ],
    },
  },
};
export const HiddenHomeProperty: Story = {
  args: {
    hiddenHome: true,
    category: {
      id: 'c5952',
      name: 'Circular Saw Blades',
      ancestors: [
        {
          id: 'c19015',
          name: 'Power Saw Blades',
          ancestors: [{ id: 'c11', name: 'Power Tools and Accessories' }],
        },
      ],
    },
  },
};
export const Long: Story = {
  args: {
    hiddenHome: false,
    category: {
      id: 'c5952',
      name: 'Circular Saw Blades',
      ancestors: [
        {
          id: 'c19015',
          name: 'Power Saw Blades',
          ancestors: [
            {
              id: 'c11',
              name: 'Power Tools and Accessories',
              ancestors: [
                {
                  id: 'c2',
                  name: 'Cutting Tools',
                  ancestors: [
                    {
                      id: 'c4856',
                      name: 'Transformers',
                      ancestors: [
                        {
                          id: 'c4530',
                          name: 'Power Distribution & Circuit Protection',
                          ancestors: [
                            {
                              id: 'c23',
                              name: 'Electrical Supplies',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
