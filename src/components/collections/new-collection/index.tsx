'use client';

import React, { useEffect, useState } from 'react';
import { Drawer } from '../../drawer';
import 'react-modern-drawer/dist/index.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import S from './styles.module.css';
import { JsonEditor } from '../../editor';
import {
  fetchCreateCollection,
  fetchDeleteCollection,
} from '@/helpers/xhrs/new-collection';
import { fetchCollections } from '@/helpers/xhrs/fetch-collections';
import { Actions } from './actions';
import { LabelError } from '../../form-controls/error-label';
import { useRouter } from 'next/navigation';

type Inputs = {
  id: string;
  name: string;
  path: string;
};

interface Props {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
  defaultValues?: Inputs;
  canEdit?: boolean;
  canDelete?: boolean;
}

const NewCollectionDrawer: React.FC<Props> = ({
  defaultValues,
  isOpen,
  setOpen,
  canEdit,
  canDelete,
}) => {
  const router = useRouter();

  const [recordValue, setRecordValue] = useState('');
  const [error, setError] = useState(false);

  type Inputs = {
    name: string;
    value: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    control,
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const submitCollection: SubmitHandler<Inputs> = (data) => {
    fetchCreateCollection(data)
      .then((res) => {
        window.alert('Success!!');
        setOpen(false);
        router.refresh();
      })
      .catch((e) => {
        window.alert('Error!!');
      });
  };

  const handleDeleteClick = () => {
    fetchDeleteCollection(defaultValues.id)
      .then((res) => {
        window.alert('Success!!');
        setOpen(false);
        router.refresh();
      })
      .catch((e) => {
        window.alert('Error!!--> ' + e.error);
      });
  };

  useEffect(() => {
    // get the record value for edit mode
    if (canEdit) {
      fetchCollections(defaultValues.name).then((d) => {
        setRecordValue(d);
      });
    }
  }, []);

  const shouldShowEditor = () => {
    // if it's not in edit mode, show immediately
    if (!canEdit || recordValue) return true;
  };

  const handleEditorError = (v) => {
    if (v?.[0]?.type === 'error') {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    if (canEdit) {
      setFocus('value');
    } else {
      setFocus('name');
    }
  }, []);

  return (
    <Drawer
      isOpen={isOpen}
      setOpen={setOpen}
      title={canEdit ? 'Edit record' : 'New record'}
      size='70%'
      actions={
        <Actions
          editError={error}
          canDelete={canDelete}
          canEdit={canEdit}
          onDeleteClick={handleDeleteClick}
        />
      }
    >
      <form id='collection-form' onSubmit={handleSubmit(submitCollection)}>
        <fieldset className='form-control-group' disabled={canEdit}>
          <label className='form-label' htmlFor='username'>
            Name
          </label>
          <input
            className='form-input'
            placeholder='example: collection-users'
            {...register('name', { required: true })}
          />
          {errors.name && <LabelError message='This field is required' />}
          {canEdit && (
            <span className='form-control-note'>
              Note: Renaming of the existing record is not feasible; for a new
              name, create a new record.
            </span>
          )}
        </fieldset>
        <div className='form-control-group'>
          <label className='form-label' htmlFor='value'>
            Value
          </label>
          <div>
            {shouldShowEditor() && (
              <Controller
                control={control}
                name='value'
                rules={{ required: true }}
                render={({ field }) => (
                  <JsonEditor
                    className={S.aceEditorOverwrites}
                    readOnly={false}
                    name={field.name}
                    value={field.value}
                    defaultValue={recordValue}
                    onChange={(val) => field.onChange(val)}
                    onValidate={handleEditorError}
                  />
                )}
              />
            )}
          </div>
        </div>
        {errors.value && <LabelError message='Value can not be blank!' />}
      </form>
    </Drawer>
  );
};

export default NewCollectionDrawer;
