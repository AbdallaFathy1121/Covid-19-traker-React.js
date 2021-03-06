import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className="infoBox">
            <CardContent>

                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                
                {/* Cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* Totla */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
