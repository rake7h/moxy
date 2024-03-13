import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import type { DropDownActions } from '@/types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  buttonChildren: React.ReactNode;
  actions: Array<DropDownActions>;
}

const DropDown: React.FC<Props> = ({ buttonChildren, actions }) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button as='div'>{buttonChildren}</Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {actions.map((l) => (
              <Menu.Item key={l.name} className='cursor-pointer'>
                {({ active }) => (
                  <span
                    onClick={l.action}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    {l.name}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { DropDown };
