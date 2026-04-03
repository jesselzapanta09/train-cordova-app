export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between pt-8 pb-4 lg:pt-10">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl tracking-widest uppercase text-gradient leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-steel-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
