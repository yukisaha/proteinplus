import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {
    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                //                여기서부터 작업

            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Home;
