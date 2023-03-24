interface LayoutProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: LayoutProps) {
  return (
    <div className="w-full text-center max-w-2xl mx-auto mb-10">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}
