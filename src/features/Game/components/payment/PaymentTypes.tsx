import { Tab } from '@headlessui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsCalendarCheck } from 'react-icons/bs';
import { RxCopy } from 'react-icons/rx';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Carousel from '@/components/carousel/Carousel';
import TextField from '@/components/inputs/TextField';
import NextImage from '@/components/NextImage';
import RadioGroup from '@/components/radio/RadioGroup';
import RadioOption from '@/components/radio/RadioOption';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';
import TabPanels from '@/components/tabs/TabPanels';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import Dialog from '@/dialog/Dialog';
import { paymentTypes } from '@/features/Game/constants/paymentTypes';
import { addressFormatter } from '@/features/Game/lib/addressFormatter';
import { useAccount } from 'wagmi';
const PaymentTypes = () => {
  const [selected, setSelected] = useState(0);
  const [userBalance, setUserBalance] = useState<number | undefined>();
  const [copiedNotification, setCopiedNotification] = useState(false);
  const { address } = useAccount();
  const { userTokenBalance, userDepositedBalance, poolBalance } =
    useQuizContext();
  const handleCopy = () => {
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
    }, 900);
  };

  return (
    <>
      <TabGroup>
        <Tab.List>
          <Carousel
            className='left-[50%] w-screen -translate-x-2/4 mobile-demo:w-[500px]'
            itemWrapperClassName='w-max'
            scrollContainerClassName='snap-none pl-[25px]'
            slide={false}
            indicators={false}
          >
            {paymentTypes.map((paymentType, index) => {
              return (
                <Tab
                  key={index}
                  className='pr-4'
                  onClick={() => setSelected(index)}
                >
                  <div
                    className={clsxm([
                      'flex h-full min-h-[127px] w-full min-w-[135px] flex-col rounded-2xl p-4',
                      selected === index ? 'bg-gradient-primary' : 'bg-white',
                    ])}
                  >
                    <div className='flex items-center justify-between gap-2'>
                      <NextImage
                        src={paymentType.imgSrc}
                        alt='paymentType'
                        fill
                        className='relative h-6 w-6'
                        imgClassName='object-contain'
                      />
                    </div>
                    <div className='mt-auto h-full text-black'>
                      <span className='block text-sm font-bold'>
                        {paymentType.name}
                      </span>
                      <span className='text-2xs'>
                        Commission {paymentType.commission}%
                      </span>
                    </div>
                  </div>
                </Tab>
              );
            })}
          </Carousel>
        </Tab.List>
        <TabPanels className='mt-8'>
          <TabPanel className='flex h-full flex-col'>
            <div className='space-y-6'>
              <div className='grid grid-cols-2 items-center justify-between gap-2'>
                <span className='text-sm'>Address Wallet</span>
                <Button
                  variant='outline'
                  rightIcon={RxCopy}
                  rightIconClassName='text-primary-500 text-xl'
                  size='base'
                  className='w-full px-5 py-3 text-white'
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    handleCopy();
                  }}
                >
                  <span className='mx-auto w-full'>
                    {addressFormatter(address)}
                  </span>
                </Button>
              </div>
              <div className='grid grid-cols-2  items-center justify-between gap-2'>
                <span className='text-sm'>Balance (FBT)</span>
                <Button
                  variant='outline'
                  rightIcon={RxCopy}
                  rightIconClassName='text-primary-500 text-xl'
                  size='base'
                  className='w-full px-5 py-3 text-white'
                  onClick={() => {
                    navigator.clipboard.writeText('120');
                    handleCopy();
                  }}
                >
                  {/* The flow token has 9 decimals*/}
                  <span className='mx-auto w-full'>2.1673 USC</span>
                </Button>
              </div>
              <h2 className='!h1'>Total Invested : {userDepositedBalance}</h2>
              <Button
                variant='outline'
                size='lg'
                className='!mt-2 mobile-m:!mt-10'
              >
                Deposit
              </Button>
            </div>
          </TabPanel>
          <TabPanel>
            <form className='space-y-6'>
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeHolder='Number'
                type='number'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeHolder='CVV'
                type='number'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white invalid:text-gray-300'
                placeHolder='Date'
                type='month'
                endAdornment={<BsCalendarCheck />}
                endAdornmentClassName='cursor-pointer'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeholder='Amount'
              />
              <div className='flex items-center gap-4'>
                <RadioGroup>
                  <div className='flex items-center gap-4 '>
                    <RadioOption
                      className='inline-block'
                      value="I agree to the terms of use of the 'Once click pay'"
                    />
                    <span className='text-2xs'>
                      I agree to the terms of use of the "Once click pay"
                    </span>
                  </div>
                </RadioGroup>
              </div>
              <Button
                variant='outline'
                size='lg'
                className='!mt-12 mobile-m:!mt-20'
              >
                Deposit
              </Button>
            </form>
          </TabPanel>
        </TabPanels>
        <TabPanel className='mt-20 flex w-full justify-center'>
          <span className='h2'>COMING SOON</span>
        </TabPanel>
      </TabGroup>
      <Dialog
        isOpen={copiedNotification}
        onClose={() => setCopiedNotification(false)}
        childrenClassName='text-center h3'
      >
        <span>Copied</span>
      </Dialog>
    </>
  );
};

export default PaymentTypes;
