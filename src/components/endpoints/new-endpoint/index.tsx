'use client';

import React, { useEffect, useState } from 'react';
import { Drawer } from '../../drawer';
import 'react-modern-drawer/dist/index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { SelectCollections } from './collection-select';
import {
  fetchCreateEndpoint,
  fetchDeleteEndpoint,
} from '@/helpers/xhrs/new-endpoints';
import { Actions } from './actions';
import { LabelError } from '../../form-controls/error-label';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  defaultValues?: Inputs;
  canEdit?: boolean;
  canDelete?: boolean;
}

type Inputs = {
  id: string;
  endpoint: string;
  moxy: string;
  targetUrl: string;
  collectionId: string;
};

const validateTargetInput = (v: string) => {
  try {
    return !!new URL(v);
  } catch {
    return false;
  }
};

const EndpointDrawer: React.FC<Props> = ({
  canDelete,
  canEdit,
  isOpen,
  setOpen,
  defaultValues = {},
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors, isValid },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const selectedMoxyType = watch('moxy');

  const submitEndpoint: SubmitHandler<Inputs> = (data) => {
    fetchCreateEndpoint({
      id: defaultValues?.id,
      endpoint: data.endpoint,
      moxyType: data.moxy,
      proxyDetails: {
        targetHost: data.targetUrl,
      },
      mockDetails: {
        collectionId: data.collectionId,
      },
    })
      .then((res) => {
        window.alert('Success!!');
        setOpen(false);
        router.refresh();
      })
      .catch((e) => {
        window.alert('Error!!--> ' + e.error);
      });
  };

  const handleDeleteClick = () => {
    fetchDeleteEndpoint(defaultValues.id)
      .then((res) => {
        window.alert('Success!!');
        setOpen(false);
        router.refresh();
      })
      .catch((e) => {
        window.alert('Error!!--> ' + e.error);
      });
  };

  return (
    <Drawer
      isOpen={isOpen}
      setOpen={setOpen}
      title={canEdit ? 'Edit endpoint' : 'New endpoint'}
      actions={
        <Actions
          canDelete={canDelete}
          canEdit={canEdit}
          onDeleteClick={handleDeleteClick}
        />
      }
    >
      <form id='endpoint-form' onSubmit={handleSubmit(submitEndpoint)}>
        <div className='form-control-group'>
          <label htmlFor='username' className='form-label'>
            Route
          </label>
          <input
            id='endpoint'
            className='form-input'
            placeholder='example: /v3/api/users'
            {...register('endpoint', { required: true })}
          />
          {errors.endpoint && <LabelError message='This field is required' />}
        </div>
        <div className='form-control-group'>
          <label htmlFor='moxyType' className='form-label'>
            Target
          </label>
          <div>
            <fieldset className='form-control-radio-group'>
              <div className='form-control-radio'>
                <input
                  {...register('moxy', { required: true })}
                  name='moxy'
                  id='proxy'
                  value='proxy'
                  type='radio'
                  className='form-input-radio'
                />
                <label className='form-label-radio' htmlFor='proxy'>
                  Proxy
                </label>
              </div>
              <div className='form-control-radio'>
                <input
                  {...register('moxy', { required: true })}
                  name='moxy'
                  id='mock'
                  value='mock'
                  type='radio'
                  className='form-input-radio'
                />
                <label className='form-label-radio' htmlFor='mock'>
                  Mock
                </label>
              </div>
            </fieldset>
            {errors.moxy && (
              <LabelError message='Select one of the target kind' />
            )}
            {selectedMoxyType === 'proxy' && (
              <>
                <label htmlFor='targetUrl' className='form-label-sec'>
                  Proxy URL
                </label>
                <input
                  className='form-input'
                  id='targetUrl'
                  placeholder='example: /v3/api/users'
                  {...register('targetUrl', {
                    required: true,
                    validate: validateTargetInput,
                  })}
                />
                {errors.targetUrl && errors.targetUrl.type === 'validate' && (
                  <LabelError message='Wrong URL format' />
                )}
                {errors.targetUrl && errors.targetUrl.type === 'required' && (
                  <LabelError message='Target URL is missing' />
                )}
              </>
            )}
            {selectedMoxyType === 'mock' && (
              <>
                <label htmlFor='collectionId' className='form-label-sec'>
                  Select a record
                </label>
                <Controller
                  control={control}
                  name='collectionId'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectCollections<typeof field> field={field} />
                  )}
                />
                {errors.collectionId && (
                  <LabelError message='Select a record that you want to map with route' />
                )}
              </>
            )}
          </div>
        </div>
      </form>
      {selectedMoxyType === 'proxy' && (
        <section className='form-example-block'>
          <h3 className='form-example-block_title'>Example proxy configs</h3>
          <div className='form-example-block_item'>
            <p className='form-example-block_item_title'>Full target URL</p>
            <p className='form-example-block_item_content'>
              /v2/get/users --&gt; http://example.com/v2/get/users
            </p>
          </div>
          <div className='form-example-block_item'>
            <p className='form-example-block_item_title'>Wildcard target</p>
            <p className='form-example-block_item_content'>
              /v2/get/users --&gt; http://example.com/*
            </p>
          </div>
        </section>
      )}
    </Drawer>
  );
};

export default EndpointDrawer;
