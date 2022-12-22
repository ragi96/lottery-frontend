import { render } from '@testing-library/react';
import { Alert, Text } from '..';
import { StatusMessages } from '../../types/utils';
import '@testing-library/jest-dom/extend-expect';

const setStatus = (status: StatusMessages) => console.log('test');

test('alert warning renders', () => {
  const { getByRole } = render(
    <Alert type="warning" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByRole('alert-warning')).toBeInTheDocument();
});

test('alert error renders', () => {
  const { getByRole } = render(
    <Alert type="error" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByRole('alert-error')).toBeInTheDocument();
});

test('alert success renders', () => {
  const { getByRole } = render(
    <Alert type="success" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByRole('alert-success')).toBeInTheDocument();
});

test('alert doesnt render', () => {
  const { queryAllByRole } = render(
    <Alert type="none" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(queryAllByRole('alert')).toHaveLength(0);
});
