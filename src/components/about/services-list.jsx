import { getServices, getSkills } from "@/actions/api"
import Chip from "../ui/chip"
import Button from "../ui/button"

export default async function ServicesList({ language }) {

    const { data: services } = await getServices({ lang: language.lang, revalidate: 0 }) ?? {}

    const columns = 3;
    const remainder = services?.length ? services.length % columns : 0;
    const fillers = remainder === 0 ? 0 : columns - remainder;

    return (
        <div className="services__grid">
            {
                services ?
                    services.length > 0 ?
                        services.map((service, i) => (
                            <div className="services__card" key={i}>
                                <div className="services__card-icon">{service.icon}</div>
                                <div className="services__card-number">{String(i + 1).padStart(2, '0')}</div>
                                <div className="services__card-content">
                                    <div className="services__card-title title">
                                        <h3>{service.title}</h3>
                                    </div>
                                    <div className="service__card-info info">
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        null
                    :
                    null
            }
            {[...Array(fillers)].map((_, i) => (
                <div className="services__empty" key={`filler-${i}`} />
            ))}
        </div>
    )
}