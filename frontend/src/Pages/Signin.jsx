import { FormA } from "../Components/Form2";

export const Signin = () => {
    return (
        <div className="relative h-screen">
            <div
                style={{
                    backgroundImage: `url(/image.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)', // Adjust the blur amount as needed
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1 // Ensure the background is behind the content
                }}
                className="bg-blur"
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
                <FormA />
            </div>
        </div>
    );
}
