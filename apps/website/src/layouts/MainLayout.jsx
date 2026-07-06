import { Outlet } from 'react-router-dom'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'

function MainLayout() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-x-hidden">
			<ScrollToTop />
			<Navbar />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default MainLayout
