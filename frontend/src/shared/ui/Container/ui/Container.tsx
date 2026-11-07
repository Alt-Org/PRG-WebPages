// stub Container component for now

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={className}>{children}</div>;
};
