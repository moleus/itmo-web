FROM quay.io/wildfly/wildfly

ARG WILDFLY_USER
ARG WILDFLY_PASS

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG DB_NAME

RUN /opt/jboss/wildfly/bin/add-user.sh ${WILDFLY_USER} ${WILDFLY_PASS} --silent

# postgres module
ADD jdbc /opt/jdbc
ADD config /opt/config

USER root
RUN chmod +x /opt/config/execute.sh

USER jboss
RUN /opt/config/execute.sh commands.cli

# cleanup
RUN rm -rf $JBOSS_HOME/standalone/configuration/standalone_xml_history

# automatically launch the standalone configuration
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-c", "standalone-full.xml"]
