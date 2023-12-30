import { type FC, type ReactNode } from 'react';

interface TitleProps {
  children?: ReactNode;
  subtitle?: ReactNode;
  caption?: ReactNode;
}

export const Title: FC<TitleProps> = ({ children, subtitle, caption }) => {
  return (
    <div className="mb-12 flex flex-col text-left lg:text-center">
      {caption && (
        <strong className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage11 dark:text-dark-sage11">
          {caption}
        </strong>
      )}
      <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-8xl lg:text-6xl">
        {children}
      </h1>
      {subtitle && (
        <p className="text-lg leading-snug text-sage11 lg:mx-auto lg:w-1/2 dark:text-dark-sage11">
          {subtitle}
        </p>
      )}
    </div>
  );
};
