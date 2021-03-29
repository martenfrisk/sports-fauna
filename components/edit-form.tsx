/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import { graphQLClient } from '@/utils/graphql-client';

const EditForm = ({ defaultValues, id, token }: { defaultValues: any, id: any, token: any }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit, register, reset, errors,
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async ({ task, completed }) => {
    if (errorMessage) setErrorMessage('');

    const query = gql`
      mutation UpdateATodo($id: ID!, $task: String!, $completed: Boolean!) {
        updateTodo(id: $id, data: { task: $task, completed: $completed}) {
          task
          completed
        }
      }
    `;

    const variables = {
      id,
      task,
      completed,
    };

    try {
      await graphQLClient(token).request(query, variables);
      Router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="task">
            Task
          </label>
          <input
            type="text"
            id="task"
            name="task"
            ref={register({ required: 'Task is required' })}
          />
          {errors.task && (
          <span role="alert">
            {errors.task.message}
          </span>
          )}
        </div>

        <div>
          <label>Completed</label>
          <input type="checkbox" name="completed" ref={register()} />
          {errors.completed && (
          <span role="alert">
            {errors.completed.message}
          </span>
          )}
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
      </form>

      {errorMessage && (
      <p role="alert">
        {errorMessage}
      </p>
      )}
    </>
  );
};

export default EditForm;
