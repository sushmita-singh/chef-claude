import headerLogo from '../images/chef-claude-icon.png'

export default function Header() {
    return (
        <header className='header'>
            <img src={headerLogo} alt="Chef Claude Logo" className = "header-logo" />
            <h1 className="header-title">Chef Claude</h1>
        </header>
    )

}
